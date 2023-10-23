import Image from 'next/image';
import Link from 'next/link';

import { formatCurrency } from '@src/constants/currency';
import { cn } from '@src/utils/cn';
import { media } from '@src/styles/media';

import { Stack } from '../Stack';
import { Text } from '../Typography';
import * as cls from './Item.css';

interface ItemProps {
    image: string;
    name: string;
    price: number;
    currency: string;
    brand: string;
    href?: string;

    extra?: React.ReactNode;
    className?: string;
}

export const Item: React.FC<ItemProps> = ({
    image,
    name,
    price,
    currency,
    brand,
    href,
    extra,
    className,
}) => {
    const destination = href ?? '#';
    const isExternal = href?.startsWith('http');
    const target = isExternal ? '_blank' : undefined;

    return (
        <div className={cn(cls.base, className)}>
            <Link href={destination} className={cls.imgWrapper} target={target}>
                <div className={cls.imgSpacer}>
                    <Image
                        src={image}
                        className={cls.img}
                        fill
                        alt={name}
                        sizes={`${media.down('sm', true)} 100vw, ${media.up('sm', true)} 50vw`}
                    />
                </div>
            </Link>
            <Stack
                direction="column"
                gap={1}
                className={cls.info}
                align="start"
            >
                <Text color="secondary" size="small">{brand}</Text>
                <Stack fullWidth align="start" justify="between" gap={4}>
                    <Text truncate as='a' target={target} href={destination} className={cls.link}>{name}</Text>
                    <Text>{formatCurrency(currency, price)}</Text>
                </Stack>
            </Stack>
            {extra && <div className={cls.extra}>{extra}</div>}
        </div>
    );
};
