'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';

import { itemSchema, type ItemSchema } from '@src/schemas/item';
import { Input, TextArea } from '@src/components/Input';
import { Stack } from '@src/components/Stack';
import { Button } from '@src/components/Button';
import { Select } from '@src/components/Select';
import { Currency, CURRENCY, getCurrencySymbol } from '@src/constants/currency';
import { type Item } from '@src/server/db/schema';

import { FImageUploader } from '../FImageUploader';
import * as cls from './ItemForm.css';

interface ItemFormProps {
    initialData?: Omit<Item, 'createdAt' | 'updatedAt'>;
    onSubmit(data: ItemSchema): void;
}

const CURRENCY_OPTIONS = CURRENCY.map((currency) => ({ value: String(currency), label: getCurrencySymbol(String(currency)) }));

const getInitialData = (initialData: ItemFormProps['initialData']): ItemSchema => ({
    name: initialData?.name ?? '',
    brand: initialData?.brand ?? '',
    price: initialData?.price ?? 0,
    currency: (initialData?.currency ?? Currency.USD) as Currency,
    url: initialData?.url ?? '',
    description: initialData?.description ?? '',
    image: initialData?.image ?? '',
});

export const ItemForm: React.FC<ItemFormProps> = ({ initialData, onSubmit }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ItemSchema>({
        defaultValues: getInitialData(initialData),
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
    );
};
