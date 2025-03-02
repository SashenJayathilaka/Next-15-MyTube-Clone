import ResponsiveSDialog from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type PlaylistCreateModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const formSchema = z.object({
  name: z.string().min(1),
});

const PlaylistCreateModal: React.FC<PlaylistCreateModalProps> = ({
  onOpenChange,
  open,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const utils = trpc.useUtils();
  const create = trpc.playList.create.useMutation({
    onSuccess: () => {
      utils.playList.getMany.invalidate();
      toast.success("Playlist Created");
      form.reset();
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    create.mutate(values);
  };

  return (
    <ResponsiveSDialog
      title="Create a Playlist"
      open={open}
      onOpenChange={onOpenChange}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prompt</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="My Favorite Videos" />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button disabled={create.isPending} type="submit">
              Create
            </Button>
          </div>
        </form>
      </Form>
    </ResponsiveSDialog>
  );
};
export default PlaylistCreateModal;
