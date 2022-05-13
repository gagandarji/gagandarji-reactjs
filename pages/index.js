import Head from "next/head"; 
import ProductCard from "../components/ProductCard";
import CategoryDrop from "../components/CategoryDrop";
import Input from "../components/form/Input";
import { PlusCircleIcon} from '@heroicons/react/solid'

import styles from "../styles/Home.module.css";
import Link from "next/link";
import { allCats, allProducts } from "../helpers/apiGet";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/Provider";



export async function getStaticProps() { 
  const res = await allProducts()
  // .catch(err => {
  //   const dataerr = { data: { err: `${JSON.stringify(err?.response?.status)}` } } 
  //   return dataerr
  // });

  const products = await res.data; 
 
  const catRes = await allCats();
  const categories = await catRes.data;  

  
  return {
    props: {
      products,
      categories
    },
  }
}



export default function Home({products,categories}) {
  const { loading, category } = useContext(GlobalContext);
 
  useEffect(() => { 
    setCatsel(category[0]);
  },[category])

   

  const [search, setSearch] = useState("")
  const [catsel, setCatsel] = useState("")

  const handleSearch = (e) => {
    // console.log(e.target.value);
    setSearch(e.target.value); 
  };
 
  return (
    <div className={styles.container}>
      <Head>
        <title>HomePage - Upayments Store | Gagan Darji</title>
        <meta name="description" content="Homepage With List of Products and Category filter and search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="container mx-auto px-4 bg-light">
          
          <div className={styles.relativeIndex + ' flex flex-col md:flex-row w-full justify-between'}>
            <Input placeholder="search" type="text" onChange={handleSearch}/>
            <CategoryDrop catlist={categories}/>
          </div>

          <div className={styles.paddingTop  +" max-w-4xl mx-auto mb-8 "}>
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              <ProductCard prodlist={products} search={search} filterCat={catsel}/>
            </div>
          </div>
        </div> 
      </main>
      <div className={styles.styckyBottom +" container relative mx-auto px-4 mt-4 mb-3"}>
      <span className={styles.plus}>
        <Link href="creatproduct">
          <PlusCircleIcon className={styles.h20 , styles.w20 +" h-20 w-20 text-black-500"}/>
        </Link>
      </span>
      </div>
    </div>
  );
}
