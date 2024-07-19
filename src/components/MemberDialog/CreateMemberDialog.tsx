import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { z } from "zod"
import { useNewMember } from "@/hooks/mutations/member"
import { useState } from "react"
import { MemberForm, memberFormSchema } from "./MemberForm"

export function CreateMemberDialog() {
    const [open, setOpen] = useState(false);

    const newMember = useNewMember();

    async function onSubmit(values: z.infer<typeof memberFormSchema>) {
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
                <DialogHeader>
                    <DialogTitle>Create Member</DialogTitle>
                    <DialogDescription>
                        Fill out the form below to create a new member.
                    </DialogDescription>
                </DialogHeader>
                <MemberForm onSubmit={onSubmit} />
            </DialogContent>
        </Dialog>
    )
}

export default CreateMemberDialog;
