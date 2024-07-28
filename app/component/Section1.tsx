import { cookies } from "next/headers";
import Image from "next/image";

interface props{
    res:{
        headers:{
            date:string
        },
        data: {
            weather:[{
                description:string,
                main:string
            }],
            name:string,
            main:{
                temp:number,
                humidity:number,
                pressure:number
            },
            visibility:number,
            wind:{
                speed:number
            }

        }
    }
    mode:string
}

export default function Section1({res,mode}:props) {
    let useName=cookies().get('userName')
    console.log(useName?.value)
  return (
    <div className='mt-5'>
        <div className={`flex justify-between items-center ${mode === 'Clear'?'text-black':"text-white"}`}>
            <p className='text-2xl font-extralight'>Good morning, {useName?.value?useName?.value:"Any one"}</p>
            <div>
                <h1 className='text-2xl font-semibold'>{res.headers.date.slice(0,16)}</h1>
                <p className='text-lg font-light'>{res.data.name}</p>
            </div>
        </div>
            <div className={` ${mode === 'Clear'? "bg-[url('/214-2145531_sky-clouds-sun-blue-ftestickers-background-clipart.png')]": mode === 'Clouds'?"bg-[url('/R.png')]":"bg-[url('/closeup-shot-window-rainy-day-raindrops-rolling-down-window_181624-21644.avif')]"} bg-cover max-w-[600px] h-[350px] rounded-xl mx-auto mt-7 flex flex-col gap-10 justify-center items-center`}>
            <div className='flex items-start flex-row gap-7 mt-10 px-5 '>
                <div className="flex items-end gap-7">
                    <div className='text-6xl sm:text-8xl font-bold text-[#ff9a03] relative'>{res.data.main.temp}
                        <p className='absolute top-0 -right-7 text-2xl'><span className='absolute -top-2 -left-[14px]'>o</span> C</p>
                    </div>
                    {res.data.weather[0].main.toLocaleLowerCase() === 'clouds' ?
                        <Image src={'/icons/cloudy-forecast-sun-svgrepo-com.svg'} alt='icon' width={100} height={100} className='w-[60px] h-[60px] sm:w-[80px] sm:h-[80px]' />
                        :
                        res.data.weather[0].main.toLocaleLowerCase() === 'clear'?
                        <Image src={'/icons/cloudy-svgrepo-com.svg'} alt='icon' width={100} height={100} className='w-[60px] h-[60px] sm:w-[80px] sm:h-[80px]' />
                        :
                        res.data.weather[0].main.toLocaleLowerCase() === 'rain'?
                        <Image src={'/icons/rain-alt-svgrepo-com.svg'} alt='icon' width={100} height={100} className='w-[60px] h-[60px] sm:w-[80px] sm:h-[80px]' />
                        :
                        <Image src={'/icons/clouds.svg'} alt='icon' width={100} height={100} className='w-[60px] h-[60px] sm:w-[80px] sm:h-[80px]' />
                     } 
                </div>
                <div className="align-text text-center">
                    <h1 className="text-xl sm:text-2xl font-semibold ">{res.data.weather[0].main}</h1>
                    <p className="font-light">{res.data.weather[0].description}</p>
                </div>
            </div>
            <div className="flex justify-between max-w-full px-5   sm:mt-10 text-center flex-wrap gap-5 ">
                <div>
                    <h1 className="text-lg ">Humidity:</h1>
                    <p className="text-xl font-bold">{res.data.main.humidity}%</p>
                </div>
                <div>
                    <h1 className="ttext-lg  font-normal">Wind:</h1>
                    <p className="text-xl font-bold">{res.data.wind.speed}km/h</p>
                </div>
                <div>
                    <h1 className="text-lg font-normal">Visibility:</h1>
                    <p className="text-xl font-bold">{res.data.visibility}</p>
                </div>
                <div>
                    <h1 className="text-lg font-normal">Pressure</h1>
                    <p className="text-xl font-bold">{res.data.main.pressure}</p>
                </div>
                <div>
                    <h1 className="text-lg font-normal">Air Quality</h1>
                    <p className="text-xl font-bold">Good</p>
                </div>

            </div>
            </div>

    </div>
  )
}
