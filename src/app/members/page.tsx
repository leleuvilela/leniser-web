"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import MemberDialog from "@/components/MemberDialog";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useMembers } from "@/hooks/queries/members";


const Members = () => {
    const { data } = useMembers();

    return (
        <DefaultLayout>
            <Card>
                <CardHeader className="flex flex-row align-center justify-between">
                    <CardTitle>
                        Members
                    </CardTitle>
                    <MemberDialog />
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>A list of members.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">Id</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>About</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.map(member => (
                                <TableRow key={member.id}>
                                    <TableCell className="font-medium">{member.id}</TableCell>
                                    <TableCell>{member.name}</TableCell>
                                    <TableCell>{member.about}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                </CardFooter>
            </Card>
        </DefaultLayout>
    )
}

export default Members;
