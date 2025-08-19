import SearchForm from "../../components/SearchForm";


export default  async function Home({searchParams}:{

     searchParams: Promise<{query?:string}>

}){

    const query=(await searchParams).query;

    
    return(
        <>
        <section className="pink_container">
            <h1 className="heading">Pitch Your Setup,<br /> Connect with Entrepreurs</h1>

            <p className="sub_heading !max-w-3xl">
                Submit Ideas,Votr on Pitches, and Get Noticed in virtual Competitions
            </p>

            <SearchForm  query={query}/>

        </section>
        
        </>
    )
}