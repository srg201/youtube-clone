import React from "react";

import ResponsiveModal from "@/components/responsive-modal";
import { trpc } from "@/trpc/client";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SparklesIcon } from "lucide-react";
import { toast } from "sonner";

interface ThumbnailGenerateModalProps {
  videoId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  prompt: z.string().min(10),
});

const ThumbnailGenerateModal = ({
  onOpenChange,
  open,
  videoId,
}: ThumbnailGenerateModalProps) => {
  const utils = trpc.useUtils();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const generateThumbnail = trpc.videos.generateThumbnail.useMutation({
    onSuccess: () => {
      toast.success("Ths may take some time", {
        description: "AI generation process for Thumbnail has been started!",
      });
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    generateThumbnail.mutate({ prompt: values.prompt, id: videoId });
    utils.studio.getOne.invalidate({ id: videoId });
    utils.studio.getMany.invalidate();
    onOpenChange(false);
  };

  return (
    <ResponsiveModal
      open={open}
      onOpenChange={onOpenChange}
      title="Generate thumbnail using AI-generation feature"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    className="resize-none"
                    cols={30}
                    rows={5}
                    placeholder="Prompt for your AI-thumbnail"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button disabled={generateThumbnail.isPending} type="submit">
              Generate <SparklesIcon />
            </Button>
          </div>
        </form>
      </Form>
    </ResponsiveModal>
  );
};

export default ThumbnailGenerateModal;
