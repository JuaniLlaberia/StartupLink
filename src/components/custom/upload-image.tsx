'use client';

import Dropzone, { FileRejection } from 'react-dropzone';
import { CloudUpload, Loader2, MousePointerSquareDashed } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import { useUploadThing } from '@/lib/uploadthing';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface UploadImageProps {
  entityType: 'user' | 'startup';
  imageType: 'image' | 'coverImage';
  entityId?: string;
  onUploadComplete?: (url: string) => void;
}

const UploadImage = ({
  entityType,
  imageType,
  entityId,
  onUploadComplete,
}: UploadImageProps) => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: res => {
      if (res?.[0]?.ufsUrl && onUploadComplete) {
        onUploadComplete(res[0].ufsUrl);
      }
      startTransition(() => {});
    },
    onUploadProgress(p) {
      setUploadProgress(p);
    },
  });

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;

    setIsDragOver(false);
    toast.error(`${file.file.type} type is not supported.`, {
      description: 'Please choose a PNG, JPG, JPEG image instead.',
    });
  };

  const onDropAccepted = (acceptedFiles: File[]) => {
    startUpload(acceptedFiles, { entityType, imageType, entityId });
    setIsDragOver(false);
  };

  const [isPending, startTransition] = useTransition();

  return (
    <Dropzone
      onDropRejected={onDropRejected}
      onDropAccepted={onDropAccepted}
      accept={{
        'image/png': ['.png'],
        'image/jpeg': ['.jpeg', '.jpg'],
      }}
      onDragEnter={() => setIsDragOver(true)}
      onDragLeave={() => setIsDragOver(false)}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className={cn(
            'bg-gray-100 rounded-lg w-full h-28 flex flex-col items-center justify-center gap-1 border-[3px] border-transparent',
            isDragOver && 'border-border border-dashed'
          )}
        >
          <input {...getInputProps()} />
          {isDragOver ? (
            <MousePointerSquareDashed className='size-5 mb-1' />
          ) : isUploading || isPending ? (
            <Loader2 className='animate-spin size-5 mb-1' />
          ) : (
            <CloudUpload className='size-5 mb-1' />
          )}
          <div className='flex flex-col justify-center mb-2 text-sm text-zinc-700'>
            {isUploading ? (
              <div className='flex flex-col items-center'>
                <p>Uploading...</p>
                <Progress
                  value={uploadProgress}
                  className='mt-2 w-40 h-2 bg-gray-300'
                />
              </div>
            ) : isDragOver ? (
              <p>
                <span className='font-semibold'>Drop file</span>
                to upload
              </p>
            ) : (
              <p>
                <span className='font-semibold underline'>Click to upload</span>{' '}
                or drag and drop
              </p>
            )}
          </div>

          {isPending ? null : (
            <p className='text-xs text-muted-foreground'>
              PNG, JPG, JPEG (max 4MB)
            </p>
          )}
        </div>
      )}
    </Dropzone>
  );
};

export default UploadImage;
