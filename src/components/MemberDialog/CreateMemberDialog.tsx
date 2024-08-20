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
import { PlusIcon } from "lucide-react"

export function CreateMemberDialog() {
    const [open, setOpen] = useState(false);

    const newMember = useNewMember();

    async function onSubmit(values: z.infer<typeof memberFormSchema>) {
        try {
            const member = {
                ...values,
                permissions: values.permissions.map(p => p.value),
            }
            await newMember.mutateAsync(member);
            setOpen(false);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen} modal>
            <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1">
                    <PlusIcon className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Member</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl overflow-y-scroll">
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
