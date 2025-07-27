import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useAssemblyAITranscription } from '@/hooks/useAssemblyAITranscription'
import { Mic, MicOff, Download, Trash2, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LiveTranscriptionProps {
  className?: string
  onTranscriptUpdate?: (transcript: string) => void
}

export function LiveTranscription({ className, onTranscriptUpdate }: LiveTranscriptionProps) {
  const [savedTranscripts, setSavedTranscripts] = useState<string>('')
  
  const {
    isRecording,
    isLoading,
    transcripts,
    error,
    startRecording,
    stopRecording,
    clearTranscripts,
    getFullTranscript
  } = useAssemblyAITranscription({
    onTranscript: () => {
      const fullTranscript = getFullTranscript()
      onTranscriptUpdate?.(fullTranscript)
    },
    onError: (error: Error) => {
      console.error('Transcription error:', error)
    }
  })

  const handleToggleRecording = async () => {
    if (isRecording) {
      await stopRecording()
      // Save the current transcript when stopping
      const fullTranscript = getFullTranscript()
      if (fullTranscript) {
        setSavedTranscripts(prev => prev + (prev ? '\n\n' : '') + fullTranscript)
      }
    } else {
      await startRecording()
    }
  }

  const handleClearAll = () => {
    clearTranscripts()
    setSavedTranscripts('')
  }

  const handleDownloadTranscript = () => {
    const fullTranscript = savedTranscripts + (savedTranscripts ? '\n\n' : '') + getFullTranscript()
    const blob = new Blob([fullTranscript], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `webinar-transcript-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopyTranscript = async () => {
    const fullTranscript = savedTranscripts + (savedTranscripts ? '\n\n' : '') + getFullTranscript()
    try {
      await navigator.clipboard.writeText(fullTranscript)
    } catch (err) {
      console.error('Failed to copy transcript:', err)
    }
  }

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString()
  }

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Live Transcription</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={isRecording ? 'destructive' : 'secondary'}>
              {isRecording ? 'Recording' : 'Stopped'}
            </Badge>
            {isLoading && (
              <Badge variant="outline">Processing...</Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            onClick={handleToggleRecording}
            disabled={isLoading}
            variant={isRecording ? 'destructive' : 'default'}
            size="sm"
          >
            {isRecording ? (
              <>
                <MicOff className="h-4 w-4 mr-2" />
                Stop Recording
              </>
            ) : (
              <>
                <Mic className="h-4 w-4 mr-2" />
                Start Recording
              </>
            )}
          </Button>
          
          <Button
            onClick={handleClearAll}
            variant="outline"
            size="sm"
            disabled={transcripts.length === 0 && !savedTranscripts}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
          
          <Button
            onClick={handleCopyTranscript}
            variant="outline"
            size="sm"
            disabled={transcripts.length === 0 && !savedTranscripts}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          
          <Button
            onClick={handleDownloadTranscript}
            variant="outline"
            size="sm"
            disabled={transcripts.length === 0 && !savedTranscripts}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">
              Error: {error.message}
            </p>
          </div>
        )}

        <ScrollArea className="h-64 w-full border rounded-md p-3">
          {savedTranscripts && (
            <>
              <div className="text-sm text-muted-foreground mb-2">Previous recordings:</div>
              <div className="text-sm mb-4 p-2 bg-muted rounded">
                {savedTranscripts}
              </div>
              <Separator className="my-4" />
            </>
          )}
          
          {transcripts.length === 0 && !savedTranscripts ? (
            <div className="text-center text-muted-foreground py-8">
              <Mic className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Click &ldquo;Start Recording&rdquo; to begin live transcription</p>
            </div>
          ) : (
            <div className="space-y-3">
              {transcripts.map((transcript, index) => (
                <div
                  key={index}
                  className={cn(
                    'text-sm p-2 rounded-md',
                    transcript.isPartial 
                      ? 'bg-yellow-50 border border-yellow-200 text-yellow-800' 
                      : 'bg-green-50 border border-green-200 text-green-800'
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="flex-1">{transcript.text}</p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatTimestamp(transcript.timestamp)}
                    </span>
                  </div>
                  {transcript.isPartial && (
                    <Badge variant="outline" className="mt-1 text-xs">
                      Processing...
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="mt-4 text-xs text-muted-foreground">
          <p>
            &bull; Green entries are final transcriptions
          </p>
          <p>
            &bull; Yellow entries are being processed
          </p>
          <p>
            &bull; Transcripts are automatically saved when you stop recording
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
