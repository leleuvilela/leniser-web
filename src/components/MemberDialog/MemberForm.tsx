import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "../ui/form";
import { Input } from "../ui/input";
import MultipleSelector from "../ui/multipleselector";
import { Textarea } from "../ui/textarea";
import { Member } from "@/hooks/queries/members";
import { Checkbox } from "../ui/checkbox";

export const memberFormSchema = z.object({
    id: z.string(),
    desc: z.string(),
    permissions: z.array(z.object({
        label: z.string(),
        value: z.string(),
    })),
    configs: z.object({
        imageCooldownEnabled: z.boolean(),
        imageCooldownTime: z.number(),
        systemPrompt: z.string(),
        botPrefix: z.string(),
    })
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
        id: member.id,
        desc: member.desc,
        permissions: member.permissions.map(p => permissionsOptions.find(po => po.value === p) || { label: p, value: p }),
        configs: member.configs,
    }
}

export function MemberForm({ onSubmit, values }: MemberFormProps) {
    const form = useForm<z.infer<typeof memberFormSchema>>({
        resolver: zodResolver(memberFormSchema),
        defaultValues: {
            id: "",
            desc: "",
            permissions: [],
            configs: {
                imageCooldownEnabled: false,
                imageCooldownTime: 120,
                systemPrompt: "",
                botPrefix: ""
            }
        },
        values: convertMemberToMemberForm(values),
    });

    const cooldownEnabled = form.watch("configs.imageCooldownEnabled");

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
                    <FormField
                        control={form.control}
                        name="configs.systemPrompt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>System prompt</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Você é um bot ironico..."
                                        className="resize-none"
                                        rows={6}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is the prompt that will be used to generate the responses.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="configs.imageCooldownEnabled"
                        render={({ field }) => (
                            <FormItem
                                className="flex flex-row items-start space-x-3 space-y-0"
                            >
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel className="font-normal">
                                    Is the image cooldown enabled?
                                </FormLabel>
                            </FormItem>
                        )}
                    />
                    {cooldownEnabled && (
                        <FormField
                            control={form.control}
                            name="configs.imageCooldownTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image cooldown time</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="120" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the time in seconds that the bot will wait before sending another image.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    <FormField
                        control={form.control}
                        name="configs.botPrefix"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bot prefix</FormLabel>
                                <FormControl>
                                    <Input placeholder="🤖 " {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is the prefix that the bot will use before every message.
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
