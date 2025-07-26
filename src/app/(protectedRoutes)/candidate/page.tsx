import PageHeader from '@/components/ui/ReusableComponents/PageHeader';
import { Webcam, GitFork, Users, Briefcase, UserCheck, Target } from 'lucide-react';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { leadData } from './__tests__/data';

const page = () => {
  return (
    <div className="w-full h-screen flex flex-col px-6 md:px-8 lg:px-10 xl:px-12 bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20">
          <Briefcase className="w-16 h-16 text-emerald-600 rotate-12" />
        </div>
        <div className="absolute top-40 right-32">
          <UserCheck className="w-12 h-12 text-teal-600 -rotate-12" />
        </div>
        <div className="absolute bottom-40 right-20">
          <Target className="w-18 h-18 text-teal-500 -rotate-12" />
        </div>
      </div>
      
      <div className="relative z-10">
      <div className="w-full flex flex-col">
        <PageHeader
          leftIcon={<Webcam className="w-3 h-3" />}
          mainIcon={<Users className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />}
          rightIcon={<GitFork className="w-3 h-3" />}
          heading="The home to all your candidates"
          placeholder="Search candidate..."
        />
      </div>

      <div className="flex-grow overflow-y-auto mt-6"> 
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-sm text-muted-foreground">Name</TableHead>
              <TableHead className="text-sm text-muted-foreground">Email</TableHead>
              <TableHead className="text-sm text-muted-foreground">Phone</TableHead>
              <TableHead className="text-right text-sm text-muted-foreground">Tags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leadData?.map((lead, idx) => (
              <TableRow key={idx} className="border-0">
                <TableCell className="font-medium">{lead?.name}</TableCell>
                <TableCell>{lead?.email}</TableCell>
                <TableCell>{lead?.phone}</TableCell>
                <TableCell className="text-right">
                  {lead?.tags?.map((tag, idx) => (
                    <Badge key={idx} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      </div>
    </div>
  );
};

export default page;
