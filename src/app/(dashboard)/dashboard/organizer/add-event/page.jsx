'use client';

import { uploadImage } from '@/app/utils/uploadImage';
import DashboardHeading from '@/components/DashboardHeading';
import { addEvent } from '@/lib/api/events/actions';
import { useSession } from '@/lib/auth-client';
import {
    Button,
    Card,
    CardHeader,
    Input,
    ListBox,
    ListBoxItem,
    Select,
    SelectIndicator,
    SelectPopover,
    SelectTrigger,
    SelectValue,
    TextArea,
    Form,
} from '@heroui/react';
import { redirect } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaImage } from 'react-icons/fa';

const CATEGORIES = ['Music', 'Tech', 'Sports', 'Arts', 'Business', 'Food', 'Other'];

const LOCATIONS = [
    'New York', 'San Francisco', 'London', 'Dhaka',
    'Tokyo', 'Berlin', 'Online',
];

const baseField =
    'w-full rounded-xl bg-slate-900/50 border px-3 text-white text-sm placeholder:text-slate-500 outline-none focus:border-pink-500 transition-colors';

const inputClass = (hasError) =>
    `${baseField} h-11 ${hasError ? 'border-red-500' : 'border-white/10'}`;

const textareaClass = (hasError) =>
    `${baseField} min-h-[160px] py-3 leading-6 resize-y ${hasError ? 'border-red-500' : 'border-white/10'
    }`;

const Field = ({ label, htmlFor, error, children }) => (
    <div className="flex flex-col gap-1.5 w-full">
        <label
            htmlFor={htmlFor}
            className="block text-sm font-semibold text-slate-200"
        >
            {label}
        </label>
        {children}
        {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
);

const AddEventPage = () => {
    const { data: session } = useSession()
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            title: '',
            banner: '',
            category: '',
            location: '',
            date: '',
            price: '',
            capacity: '',
            description: '',
        },
    });

    const onSubmit = async (data) => {
        const imageFile = data?.banner[0];
        const imageUrl = await uploadImage(imageFile)
        delete data?.banner
        const updateData = {
            ...data,
            banner: imageUrl,
            organizationEmail: session?.user.email
        }
        const result = await addEvent(updateData)
        console.log(result);
        if (result.insertedId) {
            toast.success('Event Add Successfully..')
            redirect('/events')
        }
        else{
            toast.error(result.message || 'You free limit is over')
        }
    };

    return (
        <div>
            <DashboardHeading title="Add Event" description="Add a new event" />

            <div className="mt-6 max-w-3xl">
                <Card
                    className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl"
                    radius="lg"
                >
                    <CardHeader className="flex flex-col items-start gap-1 pb-4 border-b border-white/5 p-6">
                        <h3 className="text-xl font-bold text-white">Host a New Event</h3>
                        <p className="text-slate-400 text-xs">
                            Fill out the event information.
                        </p>
                    </CardHeader>

                    <div className="p-6">
                        <Form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4 w-full"
                        >
                            {/* Title + Banner */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                <Field
                                    label="Event Title"
                                    htmlFor="title"
                                    error={errors.title?.message}
                                >
                                    <Input
                                        id="title"
                                        {...register('title', {
                                            required: 'Event title is required',
                                        })}
                                        placeholder="e.g. Rock Fest 2026"
                                        className={inputClass(!!errors.title)}
                                    />
                                </Field>

                                <Field
                                    label="Banner Image URL"
                                    htmlFor="banner"
                                    error={errors.banner?.message}
                                >
                                    {/* <Input
                                        
                                        placeholder="https://example.com/banner.jpg"
                                        className={inputClass(!!errors.banner)}
                                    /> */}
                                    <Input
                                        id="banner"
                                        {...register('banner', {
                                            required: 'Banner URL is required',
                                            pattern: {
                                                value: /^https?:\/\/.+/i,
                                                message: 'Enter a valid URL',
                                            },
                                        })}

                                        type="file"
                                        accept="image/*"
                                        // onChange={handleImageUpload}

                                        placeholder="https://example.com/avatar.jpg"
                                        labelPlacement="outside"
                                        startContent={<FaImage className="text-slate-400 text-sm" />}
                                        className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                                    />
                                </Field>
                            </div>

                            {/* Category + Location */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                <Field
                                    label="Category"
                                    htmlFor="category"
                                    error={errors.category?.message}
                                >
                                    <Controller
                                        name="category"
                                        control={control}
                                        rules={{ required: 'Select a category' }}
                                        render={({ field }) => (
                                            <select
                                                id="category"
                                                value={field.value}
                                                onChange={(e) =>
                                                    field.onChange(e.target.value)
                                                }
                                                onBlur={field.onBlur}
                                                ref={field.ref}
                                                style={{ colorScheme: 'dark' }}
                                                className={inputClass(!!errors.category)}
                                            >
                                                <option value="" disabled>
                                                    Select Category
                                                </option>
                                                {CATEGORIES.map((cat) => (
                                                    <option key={cat} value={cat}>
                                                        {cat}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    />
                                </Field>

                                <Field
                                    label="Location"
                                    error={errors.location?.message}
                                >
                                    <Controller
                                        name="location"
                                        control={control}
                                        rules={{ required: 'Select a location' }}
                                        render={({ field }) => (
                                            <Select
                                                aria-label="Location"
                                                placeholder="Select Location"
                                                selectedKey={field.value || null}
                                                onSelectionChange={(key) =>
                                                    field.onChange(key ? String(key) : '')
                                                }
                                                onBlur={field.onBlur}
                                                isInvalid={!!errors.location}
                                            >
                                                <SelectTrigger className="w-full flex items-center justify-between bg-slate-900/50 border border-white/10 rounded-xl px-3 h-11 text-white text-sm">
                                                    <SelectValue />
                                                    <SelectIndicator />
                                                </SelectTrigger>

                                                <SelectPopover>
                                                    <ListBox>
                                                        {LOCATIONS.map((loc) => (
                                                            <ListBoxItem
                                                                key={loc}
                                                                id={loc}
                                                                textValue={loc}
                                                            >
                                                                {loc}
                                                            </ListBoxItem>
                                                        ))}
                                                    </ListBox>
                                                </SelectPopover>
                                            </Select>
                                        )}
                                    />
                                </Field>
                            </div>

                            {/* Date + Price + Capacity */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                                <Field
                                    label="Date"
                                    htmlFor="date"
                                    error={errors.date?.message}
                                >
                                    <input
                                        id="date"
                                        type="date"
                                        min={new Date().toLocaleDateString('en-CA')}
                                        style={{ colorScheme: 'dark' }}
                                        {...register('date', {
                                            required: 'Date is required',
                                            validate: (value) =>
                                                value >= new Date().toLocaleDateString('en-CA') ||
                                                'Choose today or a future date',
                                        })}
                                        className={inputClass(!!errors.date)}
                                    />
                                </Field>

                                <Field
                                    label="Ticket Price ($)"
                                    htmlFor="price"
                                    error={errors.price?.message}
                                >
                                    <Input
                                        id="price"
                                        type="number"
                                        min={0}
                                        step="any"
                                        {...register('price', {
                                            required: 'Price is required',
                                            valueAsNumber: true,
                                            min: {
                                                value: 0,
                                                message: 'Price cannot be negative',
                                            },
                                        })}
                                        placeholder="0.00"
                                        className={inputClass(!!errors.price)}
                                    />
                                </Field>

                                <Field
                                    label="Available Capacity"
                                    htmlFor="capacity"
                                    error={errors.capacity?.message}
                                >
                                    <Input
                                        id="capacity"
                                        type="number"
                                        min={1}
                                        step={1}
                                        {...register('capacity', {
                                            required: 'Capacity is required',
                                            valueAsNumber: true,
                                            min: {
                                                value: 1,
                                                message: 'Capacity must be at least 1',
                                            },
                                            validate: (value) =>
                                                Number.isInteger(value) ||
                                                'Enter a whole number',
                                        })}
                                        placeholder="100"
                                        className={inputClass(!!errors.capacity)}
                                    />
                                </Field>
                            </div>

                            {/* Description */}
                            <Field
                                label="Detailed Description"
                                htmlFor="description"
                                error={errors.description?.message}
                            >
                                <TextArea
                                    id="description"
                                    {...register('description', {
                                        required: 'Description is required',
                                        minLength: {
                                            value: 10,
                                            message: 'Minimum 10 characters required',
                                        },
                                    })}
                                    placeholder="Describe your event, schedule, speakers, and important details..."
                                    className={textareaClass(!!errors.description)}
                                />
                            </Field>

                            <Button
                                type="submit"
                                isDisabled={isSubmitting}
                                className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-11 px-6"
                                radius="lg"
                            >
                                {isSubmitting ? 'Submitting...' : 'Host Event Now'}
                            </Button>
                        </Form>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AddEventPage;