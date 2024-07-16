import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useNewMember } from "@/hooks/mutations/member"
import { useState } from "react"

const schema = z.object({
    id: z.string(),
    name: z.string(),
    about: z.string(),
})

export function MemberDialog() {
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            id: "",
            name: "",
            about: "",
        },
    });

    const newMember = useNewMember();

    async function onSubmit(values: z.infer<typeof schema>) {
        try {
            await newMember.mutateAsync(values);
            setOpen(false);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">New Member</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Create Member</DialogTitle>
                            <DialogDescription>
                                Fill out the form below to create a new member.
                            </DialogDescription>
                        </DialogHeader>
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
                            <Button type="submit">Create</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default MemberDialog;
