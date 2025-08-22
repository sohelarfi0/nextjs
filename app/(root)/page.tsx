import { title } from "process";
import SearchForm from "../../components/SearchForm";
import StartupCard from "../../components/StartupCard";

export default  async function Home({searchParams}:{

     searchParams: Promise<{query?:string}>

}){

    const query=(await searchParams).query;
    const posts=[{
        _createdAt:new Date(),
        views:150,
        author:{_id:1},
        _id:1,
        description:"This is a sample pitch description for testing purposes.",
        image:"https://media.gettyimages.com/id/825151062/photo/it-is-great-to-discuss-ideas-then-bring-it-to-life.jpg?s=612x612&w=0&k=20&c=-YSbZWlHhibhIn41ItJpAmd3XYgjy7dzlUZ8LHlMR7Y="
        ,
        category:"Technology",
        title:"Innovative Tech Solutions",
    },
];
    
    return(
        <>
        <section className="pink_container">
            <h1 className="heading">Pitch Your Setup,<br /> Connect with Entrepreurs</h1>

            <p className="sub_heading !max-w-3xl">
                Submit Ideas,Votr on Pitches, and Get Noticed in virtual Competitions
            </p>

            <SearchForm  query={query}/>
            

        </section>

        <section className="section_container">
            <p className="text-30-semibold">
                {
                    query? `Search results for "${query}`:'All Startups'

                }
            </p>
            <ul className="mt-7 card_grid">
                {posts?.length>0 ?(posts.map((post:StartupCardType,index:number)=>(
                    <StartupCard key={post?._id}/>
                ))):(
                    <p className="no-results">NO startups found</p>
                )}

            </ul>
        </section>
        
        </>
    )
}




// to go particular elements initial page type cmmnd+shift+f
