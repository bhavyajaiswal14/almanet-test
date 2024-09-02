// import Hero from "@/components/hero";
// import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
// import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
// import { hasEnvVars } from "@/utils/supabase/check-env-vars";

// export default async function Index() {
//   return (
//     <>
//       {/* <Hero />
//       <main className="flex-1 flex flex-col gap-6 px-4">
//         <h2 className="font-medium text-xl mb-4">Next steps</h2>
//         {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
//       </main> */}
//       hi
//     </>
//   );
// }

"use client";

import type { NextPage } from "next";
import { ChangeEvent } from "react";
import {createClient} from "../utils/supabase/client";

const Home: NextPage = () => {
  const handleUpload=async(e: ChangeEvent<HTMLInputElement>)=>{
    let file;

if (e.target.files) {
  file = e.target.files[0];
}

// Determine the content type dynamically based on the file's MIME type
const contentType = file?.type || 'application/octet-stream';  

const { data, error } = await createClient().storage
  .from("testimages")
  .upload("public/" + file?.name, file as File, {
    contentType: contentType,
  });

if (data) {
  console.log(data);
} else if (error) {
  console.log(error);
}
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <input
        type="file"
        accept="*/*" //to accept all file types
        multiple  //to upload multiple files
        className="block w-auto text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="file_input"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          handleUpload(e);
        }}
      />
    </div>
  );
};

export default Home;
