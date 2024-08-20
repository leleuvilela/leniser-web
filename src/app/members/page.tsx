"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import CreateMemberDialog from "@/components/MemberDialog/CreateMemberDialog";
import EditMemberDialog from "@/components/MemberDialog/EditMemberDialog";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDeleteMember } from "@/hooks/mutations/member";
import { useMembers } from "@/hooks/queries/members";
import { FilterIcon, ImportIcon } from "lucide-react";
import { FaTrash } from "react-icons/fa";

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
            <Tabs defaultValue="authorized">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="authorized">Authorized Members</TabsTrigger>
                        <TabsTrigger value="members-names">Members Names</TabsTrigger>
                    </TabsList>
                    <div className="ml-auto flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8 gap-1">
                                    <FilterIcon className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>Inactive</DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button size="sm" variant="outline" className="h-8 gap-1">
                            <ImportIcon className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
                        </Button>
                        <CreateMemberDialog />
                    </div>
                </div>
                <TabsContent value="authorized">
                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                            <CardTitle>Authorized Members</CardTitle>
                            <CardDescription>Manage the users authorized to access the bot.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[200px]">Email</TableHead>
                                        <TableHead className="hidden md:table-cell">Desc</TableHead>
                                        <TableHead className="hidden md:table-cell">Permissions</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data?.map(member => (
                                        <TableRow key={member.id}>
                                            <TableCell className="font-medium">{member.id}</TableCell>
                                            <TableCell className="hidden sm:table-cell">{member.desc}</TableCell>
                                            <TableCell className="hidden md:table-cell">{member.permissions.join(" ")}</TableCell>
                                            <TableCell className="text-right">
                                                <EditMemberDialog id={member.id} />
                                                <Button variant="ghost" onClick={() => handleDelete(member.id)}>
                                                    <FaTrash />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </DefaultLayout>
    )

}

export default Members;
