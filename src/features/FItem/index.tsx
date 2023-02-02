import { type Item as ItemType } from "@prisma/client"
import { Item } from "@src/components/Item";
import { ROUTES } from "@src/constants/routes";
import { FOLDERS } from "@src/constants/s3";

interface ItemProps {
    item: Omit<ItemType, 'dateAdded' | 'description' | 'userId'>;
    edit?: boolean;
    className?: string;
}

export const FItem: React.FC<ItemProps> = ({
    item,
    edit,
    className,
}) => {
    const href = edit ? ROUTES.EDIT_ITEM.get({ params: { id: item.id } }) : item.url;
    return (
        <Item
            image={ROUTES.S3.get({
                params: {
                    id: item.image,
                    folder: FOLDERS.ITEMS,
                }                
            })}
            name={item.name}
            price={item.price}
            brand={item.brand}
            href={href}
            currency={item.currency as string}
            className={className}
        />
    );
};
