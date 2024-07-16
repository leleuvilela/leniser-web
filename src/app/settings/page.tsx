"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import Breadcrumb from "@/components/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useSettings } from "@/hooks/queries/settings";
import { useUpdateSettings } from "@/hooks/mutations/settings";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

const schema = z.object({
    imageCooldownEnabled: z.boolean(),
    imageCooldownTime: z.number(),
    systemPrompt: z.string().min(10),
    botPrefix: z.string().min(2),
})

const Settings = () => {
    const settings = useSettings();
    const updateSettings = useUpdateSettings();

    const { toast } = useToast();

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            imageCooldownEnabled: true,
            imageCooldownTime: 120,
            systemPrompt: "",
            botPrefix: "",
        },
        values: settings.data,
    });

    const cooldownEnabled = form.watch("imageCooldownEnabled");

    async function onSubmit(values: z.infer<typeof schema>) {
        try {
            await updateSettings.mutateAsync(values);
            toast({
                title: "Settings updated",
            })
        } catch (e) {
            console.log(e);
            toast({
                title: "Failed to update settings",
                variant: "destructive"
            })
        }
    }

    return (
        <DefaultLayout>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                General Settings
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-5">
                                <FormField
                                    control={form.control}
                                    name="systemPrompt"
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
                                    name="imageCooldownEnabled"
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
                                        name="imageCooldownTime"
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
                                    name="botPrefix"
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
                        </CardContent>
                        <CardFooter>
                            <div className="flex justify-end gap-4">
                                <Button type="submit">Apply</Button>
                            </div>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </DefaultLayout>
    );
};

export default Settings;
