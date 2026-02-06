import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center h-[80vh] gap-4">
			<h1 className="text-8xl font-black">There is nothing here!</h1>
			<Image src="/images/404.svg" alt="404" width={500} height={500}/>
			<p className="text-3xl">Here, a peacful lisan al-ghaib. This is SSG btw...</p>
			<Button>
				<Link href="/">Back to Home</Link>
			</Button>
		</div>
	);
}
