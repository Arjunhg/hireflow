import { useState, useEffect, useRef, useCallback } from 'react'
import { assemblyAIService } from '@/lib/assemblyai/service'

export interface TranscriptionResult {
  text: string
  timestamp: number
  isPartial: boolean
}

export interface UseAssemblyAITranscriptionOptions {
  autoStart?: boolean
  onTranscript?: (result: TranscriptionResult) => void
  onError?: (error: Error) => void
}

export function useAssemblyAITranscription(options: UseAssemblyAITranscriptionOptions = {}) {
  const [isRecording, setIsRecording] = useState(false)
  const [transcripts, setTranscripts] = useState<TranscriptionResult[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const startRecording = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Get microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true
        }
      })
      
      streamRef.current = stream

      // Start AssemblyAI streaming
      const transcriber = await assemblyAIService.startStreaming()
      
      // Set up transcription event listeners
      transcriber.on('turn', (turn: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        console.log('Received turn from AssemblyAI:', turn);
        if (turn.transcript) {
          const result: TranscriptionResult = {
            text: turn.transcript,
            timestamp: Date.now(),
            isPartial: !turn.end_of_turn
          }
          
          setTranscripts(prev => [...prev, result])
          options.onTranscript?.(result)
        }
      })

      transcriber.on('error', (error: Error) => {
        console.error('AssemblyAI transcription error:', error);
        setError(error)
        options.onError?.(error)
      })

      transcriber.on('close', (code: number, reason: string) => {
        console.log('AssemblyAI connection closed:', code, reason);
        isProcessing = false
      })

      // Set up audio context for PCM16 capture
      const audioContext = new AudioContext({ sampleRate: 16000 })
      
      // Resume audio context to prevent suspension
      if (audioContext.state === 'suspended') {
        await audioContext.resume()
      }
      
      const source = audioContext.createMediaStreamSource(stream)
      
      // Use a simpler approach with AnalyserNode instead of ScriptProcessor
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 2048
      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)
      
      source.connect(analyser)
      
      // Create a controlled audio processing loop
      let isProcessing = true
      let lastSendTime = 0
      const SEND_INTERVAL = 50 // Send every 50ms
      
      const processAudio = () => {
        if (!isProcessing) return
        
        const now = Date.now()
        if (now - lastSendTime >= SEND_INTERVAL) {
          analyser.getByteTimeDomainData(dataArray)
          
          // Convert to PCM16
          const pcmData = new Int16Array(bufferLength)
          for (let i = 0; i < bufferLength; i++) {
            const sample = (dataArray[i] - 128) / 128
            pcmData[i] = Math.max(-32768, Math.min(32767, sample * 32768))
          }
          
          // Send to AssemblyAI
          try {
            transcriber.sendAudio(new Uint8Array(pcmData.buffer))
            lastSendTime = now
          } catch (error) {
            console.error('Error sending audio to AssemblyAI:', error)
            isProcessing = false
          }
        }
        
        // Continue processing
        if (isProcessing) {
          setTimeout(processAudio, 10) // Check every 10ms
        }
      }
      
      // Start processing
      processAudio()
      
      // Store references for cleanup
      mediaRecorderRef.current = { 
        stop: () => {
          console.log('Stopping audio processing...')
          isProcessing = false
          source.disconnect()
          analyser.disconnect()
          audioContext.close()
        }
      } as any
      
      // Set up periodic check to keep audio context active
      const audioContextCheckInterval = setInterval(() => {
        if (audioContext.state === 'suspended') {
          console.log('Audio context suspended, resuming...')
          audioContext.resume()
        }
      }, 1000) // Check every second
      
      // Store the interval for cleanup
      ;(mediaRecorderRef.current as any).interval = audioContextCheckInterval
      
      setIsRecording(true)
      setIsLoading(false)
      
    } catch (err) {
      const error = err as Error
      setError(error)
      setIsLoading(false)
      options.onError?.(error)
    }
  }, [options])

  const stopRecording = useCallback(async () => {
    try {
      setIsLoading(true)

      if (mediaRecorderRef.current) {
        // Clear the audio context check interval
        if ((mediaRecorderRef.current as any).interval) {
          clearInterval((mediaRecorderRef.current as any).interval)
        }
        mediaRecorderRef.current.stop()
        mediaRecorderRef.current = null
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
        streamRef.current = null
      }

      await assemblyAIService.stopStreaming()
      setIsRecording(false)
      setIsLoading(false)
      
    } catch (err) {
      const error = err as Error
      setError(error)
      setIsLoading(false)
      options.onError?.(error)
    }
  }, [options])

  const clearTranscripts = useCallback(() => {
    setTranscripts([])
  }, [])

  const getFullTranscript = useCallback(() => {
    return transcripts
      .filter(t => !t.isPartial)
      .map(t => t.text)
      .join(' ')
  }, [transcripts])

  // Auto-start if requested
  useEffect(() => {
    if (options.autoStart) {
      startRecording()
    }

    return () => {
      if (isRecording) {
        stopRecording()
      }
    }
  }, [options.autoStart, startRecording, stopRecording, isRecording])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isRecording) {
        stopRecording()
      }
    }
  }, [isRecording, stopRecording])

  return {
    isRecording,
    isLoading,
    transcripts,
    error,
    startRecording,
    stopRecording,
    clearTranscripts,
    getFullTranscript
  }
}
