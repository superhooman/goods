import type { Item } from "@prisma/client";
import { HomeGrid } from "@src/features/HomeGrid";
import type { GetServerSideProps} from "next";
import { type NextPage } from "next";
import { prisma } from '@src/server/db';
import { Container } from "@src/components/Container";
import { Head } from "@src/components/Head";
import { ROUTES } from "@src/constants/routes";

interface HomeProps {
  items: Omit<Item, 'dateAdded' | 'description' | 'userId'>[];
}

const Home: NextPage<HomeProps> = ({
  items,
}) => {
  return (
    <>
      <Head
        title="Products | que.kz"
        description="A collection of beautiful products."
        url={ROUTES.HOME.get({ full: true })}
      />
      <Container size="noLimit" withPadding withPaddingY>
        <HomeGrid items={items} />
      </Container>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const items = await prisma.item.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      brand: true,
      currency: true,
      image: true,
      url: true,
    }
  });

  return {
    props: {
      items,
    },
  };
}