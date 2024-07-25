import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "../ui/form";
import { Input } from "../ui/input";
import MultipleSelector from "../ui/multipleselector";
import { Member } from "@/hooks/queries/members";

export const memberFormSchema = z.object({
    _id: z.string(),
    desc: z.string(),
    permissions: z.array(z.object({
        label: z.string(),
        value: z.string(),
    })),
})

const permissionsOptions = [
    { label: "Message Create", value: "MESSAGE_CREATE" },
    { label: "Message Revoke", value: "MESSAGE_REVOKE" },
    { label: "Save Message", value: "SAVE_MESSAGE" },
]

interface MemberFormProps {
    onSubmit: (values: z.infer<typeof memberFormSchema>) => void;
    values?: Member;
}

function convertMemberToMemberForm(member?: Member): z.infer<typeof memberFormSchema> | undefined {
    if (!member) {
        return undefined;
    }

    return {
        _id: member._id,
        desc: member.desc,
        permissions: member.permissions.map(p => permissionsOptions.find(po => po.value === p) || { label: p, value: p }),
    }
}

export function MemberForm({ onSubmit, values }: MemberFormProps) {
    const form = useForm<z.infer<typeof memberFormSchema>>({
        resolver: zodResolver(memberFormSchema),
        defaultValues: {
            _id: "",
            desc: "",
            permissions: [],
        },
        values: convertMemberToMemberForm(values),
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4 my-2">
                    <FormField
                        control={form.control}
                        name="_id"
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
                        name="desc"
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
                        name="permissions"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Permissions</FormLabel>
                                <FormControl>
                                    <MultipleSelector
                                        {...field}
                                        defaultOptions={permissionsOptions}
                                        placeholder="Select permissions..."
                                        emptyIndicator={
                                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                                no results found.
                                            </p>
                                        }
                                    />
                                </FormControl>
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
