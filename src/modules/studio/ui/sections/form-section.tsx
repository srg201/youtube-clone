"use client";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Copy,
  CopyCheckIcon,
  Globe2Icon,
  Loader2Icon,
  LockIcon,
  MoreVerticalIcon,
  TrashIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { videoUpdateSchema } from "@/db/schema";
import VideoPlayer from "@/modules/videos/ui/components/video-player";
import Link from "next/link";
import { snakeCaseToTitile } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface FormSectionProps {
  videoId: string;
}

const FormSection = ({ videoId }: FormSectionProps) => {
  return (
    <Suspense fallback={<FormSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <FormSectionSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const FormSectionSkeleton = () => {
  return <p>Loading...</p>;
};

const FormSectionSuspense = ({ videoId }: FormSectionProps) => {
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);
  const [video] = trpc.studio.getOne.useSuspenseQuery({ id: videoId });
  const [categories] = trpc.categories.getMany.useSuspenseQuery();
  const utils = trpc.useUtils();

  const update = trpc.videos.update.useMutation({
    onSuccess: () => {
      toast.success("Video details has been updated successfully");
      utils.studio.getMany.invalidate();
      utils.studio.getOne.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const remove = trpc.videos.remove.useMutation({
    onSuccess: () => {
      toast.success("Video has been removed successfully");
      utils.studio.getMany.invalidate();
      router.replace("/studio");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<z.infer<typeof videoUpdateSchema>>({
    resolver: zodResolver(videoUpdateSchema),
    defaultValues: video,
  });

  const onSubmit = (data: z.infer<typeof videoUpdateSchema>) => {
    update.mutate(data);
  };

  //TODO: Change if deployng outside Vercel
  const fullUrl = `${
    process.env.VERCEL_URL || "http://localhost:3000"
  }/videos/${videoId}`;

  const onCopy = async () => {
    await navigator.clipboard.writeText(fullUrl);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Video details</h1>
            <p className="text-xs text-muted-foreground">
              Manage your video details
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <Button
              type="submit"
              className="flex items-center gap-1"
              disabled={update.isPending}
            >
              {update.isPending ? (
                <>
                  <Loader2Icon className="size-4 animate-spin" /> Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} size={"icon"}>
                  <MoreVerticalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => remove.mutate({ id: videoId })}
                >
                  <TrashIcon className="size-4 mr-2" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="space-y-8 lg:col-span-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Add title to your video" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Add thumbnail field here  */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value ?? ""}
                      rows={10}
                      className="pr-10 resize-none"
                      placeholder="Add description to your video"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    defaultValue={field.value ?? undefined}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.length > 0 &&
                        categories.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-y-8 lg:col-span-2">
            <div className="flex flex-col bg-accent rounded-xl overflow-hidden h-fit">
              <div className="aspect-video overflow-hidden relative">
                <VideoPlayer
                  playbackId={video.muxPlaybackId}
                  thumbnailUrl={video.thumbnailUrl}
                  onPlay={() => {}}
                />
              </div>
              <div className="p-4 flex flex-col gap-y-6">
                <div className="flex justify-between items-center gap-x-2">
                  <div className="flex flex-col gap-y-1">
                    <p className="text-muted-foreground">Video Link</p>
                    <div className="flex items-center gap-x-2">
                      <Link
                        className="line-clamp-1 text-sm text-blue-500"
                        href={`/videos/${video.id}`}
                      >
                        <p>{fullUrl}</p>
                      </Link>
                      <Button
                        type="button"
                        variant={"ghost"}
                        className="flex-shrink-0"
                        onClick={onCopy}
                        size={"icon"}
                        disabled={isCopied}
                      >
                        {isCopied ? <CopyCheckIcon /> : <Copy />}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-y-1">
                    <p className="text-muted-foreground text-sm">
                      Video Status
                    </p>

                    <p className="text-sm">
                      {snakeCaseToTitile(video.muxStatus || "preparing")}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-y-1">
                    <p className="text-muted-foreground text-sm">
                      Subtitles Status
                    </p>

                    <p className="text-sm">
                      {snakeCaseToTitile(
                        video.muxTrackStatus || "no_subtitles"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visibility</FormLabel>
                  <Select
                    value={field.value}
                    defaultValue={field.value ?? undefined}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="public">
                        <div className="flex gap-2 items-center">
                          <Globe2Icon className="size-4" /> Public
                        </div>
                      </SelectItem>
                      <SelectItem value="private">
                        <div className="flex gap-2 items-center">
                          <LockIcon className="size-4" /> Private
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};
export default FormSection;
