import type React from "react"
import RegisterHeader from "../../components/RegisterHeader/RegisterHeader"
import Footer from "../../components/Footter"
interface Props{
    children?:React.ReactNode
}

export default function RegisterLayout({children}:Props)
{
    return (
       <div>
        <RegisterHeader/>
       {children}
       <Footer/>
       </div>
    )
}