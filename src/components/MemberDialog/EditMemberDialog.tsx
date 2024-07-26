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
import { useUpdateMember } from "@/hooks/mutations/member"
import { useState } from "react"
import { useMember } from "@/hooks/queries/members"
import { MemberForm, memberFormSchema } from "./MemberForm"
import { FaPencilAlt } from "react-icons/fa"

interface MemberEditProps {
    id: string;
}

export function MemberDialog({ id }: MemberEditProps) {
    const [open, setOpen] = useState(false);

    const member = useMember(id);
    const newMember = useUpdateMember();

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
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <FaPencilAlt />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle>Edit Member</DialogTitle>
                    <DialogDescription>
                        Fill out the form below to edit the member.
                    </DialogDescription>
                </DialogHeader>
                <MemberForm onSubmit={onSubmit} values={member.data} />
            </DialogContent>
        </Dialog>
    )
}

export default MemberDialog;
