import Center from "./Center";
import styled from "styled-components"
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import FlyingButton from "./FlyingButton";
import {RevealWrapper} from 'next-reveal'


const Bg = styled.div`
   background-color: #222;
   color:#fff;
   padding: 50px 0;

`;
const Title = styled.h1`
   margin:0;
   font-weight:normal;
   font-size:1.5rem;
   @media screen and (min-width: 768px) {
    font-size:3rem;

   }
`;

const Desc = styled.p`
   color:#aaa;
   font-size:.8rem;

`;
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img.main{
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
    
  }
  div:nth-child(1) {
    order: 2;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
  }
   img{
    max-width: 100%;
   }
`;
const Column = styled.div`
display: flex;
align-items: center;

`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`; 


export default function Featured ({product}) {
    
    
    return(
        <Bg>
            <Center>
                <ColumnsWrapper>
                    <Column>
                    <div>
                    
            <RevealWrapper origin={'left'} delay={0}>
            <Title>{product.title}</Title>
            <Desc>
              {product.description}
            </Desc>
            <ButtonsWrapper>
            <ButtonLink href={'/product/'+product._id} 
            outline={1} white={1} > Read more</ButtonLink>
            <FlyingButton white={1} _id={product._id} src={product.images?.[0]}>
            <CartIcon />
                Add to cart
            </FlyingButton>
            
            </ButtonsWrapper>
            </RevealWrapper>
            
           
                    </div>
                   </Column>
                    <Column>
                     <RevealWrapper delay={0}>
                     <img className={'main'} src="https://vimal-next-ecommerce.s3.amazonaws.com/1685674008533.jpg" alt=""/>
                     </RevealWrapper>
                        
                        </Column>
                </ColumnsWrapper>
            
            </Center>
            
        </Bg>
    );
}