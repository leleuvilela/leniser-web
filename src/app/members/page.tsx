"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import CreateMemberDialog from "@/components/MemberDialog/CreateMemberDialog";
import EditMemberDialog from "@/components/MemberDialog/EditMemberDialog";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useDeleteMember } from "@/hooks/mutations/member";
import { useMembers } from "@/hooks/queries/members";
import { FaTrash, FaPencilAlt } from "react-icons/fa";

const Members = () => {
    const { data } = useMembers();
    const deleteMember = useDeleteMember();

    async function handleDelete(id: string) {
        try {
            await deleteMember.mutateAsync(id);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <DefaultLayout>
            <Card>
                <CardHeader className="flex flex-row align-center justify-between">
                    <CardTitle>
                        Members
                    </CardTitle>
                    <CreateMemberDialog />
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>A list of members.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">Id</TableHead>
                                <TableHead>Desc</TableHead>
                                <TableHead>Permissions</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.map(member => (
                                <TableRow key={member._id}>
                                    <TableCell className="font-medium">{member._id}</TableCell>
                                    <TableCell>{member.desc}</TableCell>
                                    <TableCell>{member.permissions.join(" ")}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-3">
                                            <EditMemberDialog id={member._id} />
                                            <Button variant="ghost" onClick={() => handleDelete(member._id)}>
                                                <FaTrash />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </DefaultLayout>
    )
}

export default Members;
