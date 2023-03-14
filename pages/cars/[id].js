// Allows us to access query paramters from the url
import{ useRouter } from 'next/router'

// Used for SEO etc.
import Head from 'next/head'

export default function Car({ car }) {
    const router = useRouter()
    const { id } = router.query
    console.log(id)

    return (
        <div>
            <Head>
                <title>{car.color} | {car.id}</title>
            </Head>
            <h1>Helflo {id}</h1>
            <img src={car.image} />
        </div>
    )
    
}

// Rendered at evert "GET"
// params: defined by the route
// Does not need to be defined like w/ static pages bcz client defines it
export async function getServerSideProps({ params }) {
    console.log(params)
    const req = await fetch(`http://localhost:3000/${params.id}.json`)
    const data = await req.json()

    return {
        props: { car: data }
    }
}

// // Next JS will automatically call this function when project is build.
// // Will send the result as props to the component
// export async function getStaticProps({ params }) {
//     // Public -- this request will return the file
//     const req = await fetch(`http://localhost:3000/${params.id}.json`)
//     const data = await req.json()

//     return {
//         props: { car: data }
//     }
// }

// // return an array for every route from this dynamic URL
// // each object in the array will be called by getStaticProps({ params })
// export async function getStaticPaths() {
//     const req = await fetch(`http://localhost:3000/cars.json`)
//     const data = await req.json()

//     const paths = data.map(car => {
//         return { params: { id: car }}
//     })

//     return  {
//         paths,
//         fallback: false
//     }
// }