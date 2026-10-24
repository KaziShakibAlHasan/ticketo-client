'use client'
import { uploadImage } from '@/app/utils/uploadImage';
import DashboardHeading from '@/components/DashboardHeading';
import { addOrganization, updateOrganization } from '@/lib/api/organization/actions';
import { myOrganization } from '@/lib/api/organization/data';
import { useSession } from '@/lib/auth-client';
import { Button, Card, CardHeader, Form, Input, TextArea } from '@heroui/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaImage } from 'react-icons/fa';


const Organization = () => {
    const { data: session } = useSession()
    const [myOrg, setMyOrg] = useState(null)
    const { register, handleSubmit, } = useForm()

    useEffect(() => {
        const setOrgData = async () => {
            const org = await myOrganization(session?.user.email)
            setMyOrg(org)
            console.log(org, 'org');
        }
        setOrgData()

    }, [session])
    console.log(myOrg);



    const onSubmit = async (data) => {
        const imageFile = data?.logo[0];
        const imageUrl = await uploadImage(imageFile)

        const orgData = {
            logo: imageUrl,
            website: data.website,
            description: data.description,
            organizerEmail: session?.user.email,
            organizationName: data.organizationName
        }
        if (!myOrg) {
            const resData = await addOrganization(orgData)
            if (resData?.acknowledged) {
                toast.success("Organization created successfully!");
            }
        } else {
            // const updateRes = await updateOrganization(orgData, myOrg._id)
            // if (updateRes.modifiedCount > 0) {
            //     toast.success("Organization created Updated");
            // }

            // console.log(updateRes, 'updateres');
            const updateRes = await updateOrganization(orgData, myOrg._id);

            if (updateRes.modifiedCount > 0) {
                toast.success("Organization updated successfully!");
            } else if (updateRes.matchedCount > 0) {
                toast.success("No changes detected.");
            } else {
                toast.error("Organization not found!");
            }

            console.log(updateRes, "updateres");
        }

    }
    return (
        <div>
            <DashboardHeading title={'My Organization Profile'} description={'Update Organization logo, profile, webside and description'} />
            <div>
                <div className="mt-6 space-y-6 max-w-3xl">
                    <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl" radius="lg">
                        <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5 p-6">
                            <h3 className="text-xl font-bold text-white">Organization Details</h3>
                            <p className="text-slate-400 text-xs">Review and edit your organization credentials.</p>
                        </CardHeader>
                        <div className="p-6">
                            <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
                                <Input
                                    defaultValue={myOrg?.organizationName}
                                    {...register("organizationName", { required: "organizationName is Required" })}
                                    id="organizationName" label="Organization Name" labelPlacement="outside" placeholder="TechEvents Corp" required className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500" />
                                <Input
                                    {...register("logo", { required: "Logo is Required" })}
                                    id="logo"

                                    type="file"
                                    accept="image/*"
                                    // onChange={handleImageUpload}

                                    placeholder="https://example.com/avatar.jpg"
                                    labelPlacement="outside"
                                    startContent={<FaImage className="text-slate-400 text-sm" />}
                                    className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                                />

                                <Input
                                    defaultValue={myOrg?.website}
                                    {...register("website", { required: "Website is Required" })}
                                    id="website" label="Organization Website" labelPlacement="outside" placeholder="techevents.corp" required className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500" />

                                <TextArea
                                    defaultValue={myOrg?.description}
                                    {...register("description", { required: "Description is Required" })}
                                    id="org-desc" label="Description" labelPlacement="outside" placeholder="Hosting global developer conferences and software hacking marathons." required className="w-full bg-slate-900/50 border border-white/10 rounded-xl focus:outline-none min-h-[100px] text-white text-sm" />

                                <div className="flex gap-4">
                                    <Button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-11 px-6 shadow-lg" radius="lg">Save Changes</Button>
                                </div>
                            </Form>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Organization;