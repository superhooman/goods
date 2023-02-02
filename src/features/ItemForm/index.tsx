import type { Item } from "@prisma/client"
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { itemSchema, type ItemSchema } from "@src/schemas/item";
import { Input, TextArea } from "@src/components/Input";
import { Stack } from "@src/components/Stack";
import { Button } from "@src/components/Button";

import * as cls from './ItemForm.css';
import { FImageUploader } from "../FImageUploader";
import React from "react";
import { Select } from "@src/components/Select";
import { CURRENCY, getCurrencySymbol } from "@src/constants/currency";

interface ItemFormProps {
    initialData?: Omit<Item, 'dateAdded'>;
    onSubmit(data: ItemSchema): void;
}

const CURRENCY_OPTIONS = CURRENCY.map((currency) => ({ value: String(currency), label: getCurrencySymbol(String(currency)) }));

export const ItemForm: React.FC<ItemFormProps> = ({ initialData, onSubmit }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ItemSchema>({
        defaultValues: initialData ?? {
            currency: 'USD',
        },
        resolver: zodResolver(itemSchema),
    });

    const onImageChange = React.useCallback((value: string) => {
        setValue('image', value);
    }, [setValue]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <Stack
                direction="column"
                gap={4}
                fullWidth
            >
                <div
                    className={cls.grid}
                >
                    <FImageUploader
                        value={initialData?.image}
                        onChange={onImageChange}
                        error={Boolean(errors.image?.message)}
                    />
                    <Stack
                        direction="column"
                        gap={2}
                        fullWidth
                    >
                        <Input
                            {...register('name')}
                            error={errors.name?.message}
                            fullWidth
                            label="Name"
                            required
                        />
                        <Stack gap={4} align="start" fullWidth>
                            <Input
                                {...register('brand')}
                                error={errors.brand?.message}
                                fullWidth
                                label="Brand"
                                required
                            />
                            <Input
                                {...register('price', {
                                    valueAsNumber: true,
                                })}
                                type="number"
                                error={errors.price?.message}
                                fullWidth
                                label="Price"
                                required
                            />
                            <Select
                                {...register('currency')}
                                error={errors.currency?.message}
                                label="Currency"
                                required
                                options={CURRENCY_OPTIONS}
                            />
                        </Stack>
                        <Input
                            {...register('url')}
                            type="url"
                            error={errors.url?.message}
                            fullWidth
                            label="URL"
                            required
                        />
                    </Stack>
                </div>
                <TextArea
                    {...register('description')}
                    label="Description"
                    error={errors.description?.message}
                    fullWidth
                />
                <Button size="large" fullWidth variant="primary" type="submit">
                    Submit
                </Button>
            </Stack>
        </form>
    )
}