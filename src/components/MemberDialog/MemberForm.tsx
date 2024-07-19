import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "../ui/form";
import { Input } from "../ui/input";

export const memberFormSchema = z.object({
    id: z.string(),
    name: z.string(),
    about: z.string(),
})

interface MemberFormProps {
    onSubmit: (values: z.infer<typeof memberFormSchema>) => void;
    values?: z.infer<typeof memberFormSchema>;
}

export function MemberForm({ onSubmit, values }: MemberFormProps) {
    const form = useForm<z.infer<typeof memberFormSchema>>({
        resolver: zodResolver(memberFormSchema),
        defaultValues: {
            id: "",
            name: "",
            about: "",
        },
        values
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4 my-2">
                    <FormField
                        control={form.control}
                        name="id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>User identification (number)</FormLabel>
                                <FormControl>
                                    <Input placeholder="556299999999@c.us" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is the user identification number.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>User Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="João" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is the user name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="about"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>About</FormLabel>
                                <FormControl>
                                    <Input placeholder="Lindo e gostoso" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is the user description.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <DialogFooter className="flex justify-between">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <Button type="submit">Save</Button>
                </DialogFooter>
            </form>
        </Form>
    )
}
