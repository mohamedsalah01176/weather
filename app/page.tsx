import axios from "axios";
import Section1 from "./component/Section1";
import Section2 from "./component/Section2";
import { countries } from "./helpers/Countries";
import Header from "./component/Header";

export default async function Home(Params:any) {
  let search=Params.searchParams.search
  let token=process.env.NEXT_PUBLIC_TOKEN
  let baseURL=process.env.NEXT_PUBLIC_BASE_URL
  
  
  function getSearch(){

    let item=countries.filter((item:any)=>item.toLowerCase().replace(" ","-").indexOf(search) !== -1)
    return item[0]
  }
  
  let resCurrent:any=await axios.get(`${baseURL}/weather?q=${getSearch()?getSearch():'London'}&appid=${token}&units=metric`)
  
  let resDaily:any=await axios.get(`${baseURL}/forecast?q=${getSearch()?getSearch():"London"}&appid=${token}&units=metric`)
  

  let mode=resCurrent.data.weather[0].main


  return (
    <div className={`p text-white ${mode === 'Clear'? "bg-[url('/beautiful-morning-sky-colorful-light-clouds-conceptual-background-image-173905504.webp')]": mode === 'Clouds'?"bg-[url('/R.jpeg')]":"bg-[url('/white-clouds-rain-fog-sky_107791-4444.avif')]"}  bg-cover min-h-screen`}>
      <Header/>
      <div className="px-5">
        <Section1 mode={mode} res={resCurrent}/>
        <Section2  res= {resDaily}/>
      </div>
    </div>

  );
}
