import Center from "@/components/Center";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { authOptions } from "./api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";
import NewProducts from "@/components/NewProducts";
import {getServerSession} from "next-auth";


 export default function ProductPage({products,wishedProducts}) {
    
    return (
<>
    <Header />
    <Center> 
    <Title>All products</Title>
    <ProductsGrid products={products} wishedProducts={wishedProducts} />
    </Center>
   
    </>
    );
}

        export async function getServerSideProps(ctx) {
        await mongooseConnect();
        const products = await Product.find({}, null, {sort:{'_id': -1}});
        const session = await getServerSession(ctx.req, ctx.res, authOptions);
        const wishedProducts = session?.user 
            ? await WishedProduct.find({
              userEmail:session?.user.email,
            product:products.map(p => p._id.toString()),

  }) : [];
    
        return {
            props:{
               products: JSON.parse(JSON.stringify(products)) ,
               wishedProducts: wishedProducts.map(i => i.product.toString()),
            }  
        };
   
 }