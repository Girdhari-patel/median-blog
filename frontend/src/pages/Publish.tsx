import { AppBar } from "../components/AppBar"

export const Publish= ()=>{
    return <>
    <AppBar/>
    <div className="flex justify-center ">
        <div className="max-w-screen-lg w-full">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
<input type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="title"/>

        </div>
      </div>
    </>
}