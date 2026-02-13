import Link from "next/link";
import {Accordion} from "radix-ui";
import Button from "@/components/ui/Button";

export const dynamic = "force-static";
export const revalidate = 60;

export default function FaqPage() {
	return (
		<main className="min-h-screen bg-surface px-4 py-12 sm:px-8">
			<div className="mx-auto w-full max-w-3xl">
				<header className="mb-10">
					<div className="mb-6">
						<Link href="/">
							<Button variant="secondary" className="px-0">
								← Back to Products
							</Button>
						</Link>
					</div>

					<h1 className="font-bricolage text-4xl font-black tracking-tight text-on-surface sm:text-5xl">
						FAQ
					</h1>
					<p className="mt-3 text-on-surface-variant">
						Quick answers about ordering, shipping, returns, and your cart.
					</p>
				</header>

				<section
					aria-label="Frequently asked questions"
					className="rounded-2xl border border-outline-variant bg-surface-container-low p-4 sm:p-6"
				>
					<Accordion.Root type="single" collapsible>
						<Accordion.Item value="item-1" className="border-b border-outline-variant py-2">
							<Accordion.Header>
								<Accordion.Trigger
									className="flex w-full items-center justify-between py-3 text-left font-semibold text-on-surface">
									<span>What payment methods do you accept?</span>
									<span aria-hidden className="text-on-surface-variant">
										+
									</span>
								</Accordion.Trigger>
							</Accordion.Header>
							<Accordion.Content className="pb-4 text-on-surface-variant">
								We support major credit cards and other payment options depending on
								your region. If a method is unavailable, it will be hidden at
								checkout.
							</Accordion.Content>
						</Accordion.Item>

						<Accordion.Item value="item-2" className="border-b border-outline-variant py-2">
							<Accordion.Header>
								<Accordion.Trigger
									className="flex w-full items-center justify-between py-3 text-left font-semibold text-on-surface">
									<span>How does shipping work?</span>
									<span aria-hidden className="text-on-surface-variant">
										+
									</span>
								</Accordion.Trigger>
							</Accordion.Header>
							<Accordion.Content className="pb-4 text-on-surface-variant">
								Shipping costs and delivery estimates are shown in the checkout
								flow. Your order summary will update before you confirm.
							</Accordion.Content>
						</Accordion.Item>

						<Accordion.Item value="item-3" className="border-b border-outline-variant py-2">
							<Accordion.Header>
								<Accordion.Trigger
									className="flex w-full items-center justify-between py-3 text-left font-semibold text-on-surface">
									<span>What is your return policy?</span>
									<span aria-hidden className="text-on-surface-variant">
										+
									</span>
								</Accordion.Trigger>
							</Accordion.Header>
							<Accordion.Content className="pb-4 text-on-surface-variant">
								Returns are accepted on eligible items in original condition within
								a limited time window. Keep your receipt and packaging for the
								smoothest process.
							</Accordion.Content>
						</Accordion.Item>

						<Accordion.Item value="item-4" className="border-b border-outline-variant py-2">
							<Accordion.Header>
								<Accordion.Trigger
									className="flex w-full items-center justify-between py-3 text-left font-semibold text-on-surface">
									<span>Where is my cart saved?</span>
									<span aria-hidden className="text-on-surface-variant">
										+
									</span>
								</Accordion.Trigger>
							</Accordion.Header>
							<Accordion.Content className="pb-4 text-on-surface-variant">
								Your cart is stored locally in your browser, so it stays available
								when you come back on the same device and browser.
							</Accordion.Content>
						</Accordion.Item>

						<Accordion.Item value="item-5" className="py-2">
							<Accordion.Header>
								<Accordion.Trigger
									className="flex w-full items-center justify-between py-3 text-left font-semibold text-on-surface">
									<span>How do I contact support?</span>
									<span aria-hidden className="text-on-surface-variant">
										+
									</span>
								</Accordion.Trigger>
							</Accordion.Header>
							<Accordion.Content className="pb-2 text-on-surface-variant">
								Use the contact information in the site footer, or reach out via
								the admin team if you are managing products.
							</Accordion.Content>
						</Accordion.Item>
					</Accordion.Root>
				</section>
			</div>
		</main>
	);
}
