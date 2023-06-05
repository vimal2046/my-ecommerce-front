import Header from "@/components/Header"
import styled from "styled-components"
import Featured from "@/components/Featured"
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import NewProducts from "@/components/NewProducts";
import { WishedProduct } from "@/models/WishedProduct";
import {getServerSession} from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";


export default function HomePage ({featuredProduct,newProducts,wishedNewProducts}) {
  return (
    <div>

      <Header/>
      <Featured product={featuredProduct}/>
      <NewProducts products={newProducts} wishedProducts={wishedNewProducts}/>

    </div>
  );
}

export async function getServerSideProps(ctx) {
  const featuredProductId = '64774e2b09fa6534ef11a3aa' ;
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedNewProducts = session?.user ? 
   await WishedProduct.find({
      userEmail:session.user.email,
      product:newProducts.map(p => p._id.toString()),

  }) : [];
  return {
    props: {    
    featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
    newProducts: JSON.parse(JSON.stringify(newProducts)),
    wishedNewProducts: wishedNewProducts.map(i => i.product.toString()),
  },
}
};
