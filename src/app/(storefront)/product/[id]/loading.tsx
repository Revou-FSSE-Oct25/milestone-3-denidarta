import {Skeleton} from "@radix-ui/themes";

export default function Loading() {
	return (
		<main className="min-h-svh max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div className="mb-8">
				<Skeleton>
					<div className="h-6 w-44" />
				</Skeleton>
			</div>

			<div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
				<div className="flex flex-col-reverse">
					<div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
						<div className="grid grid-cols-4 gap-6">
							{Array.from({length: 4}).map((_, index) => (
								<Skeleton key={index}>
									<div className="h-24 w-full rounded-md" />
								</Skeleton>
							))}
						</div>
					</div>

					<div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border bg-gray-100">
						<Skeleton>
							<div className="h-full w-full" />
						</Skeleton>
					</div>
				</div>

				<div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
					<div className="flex flex-col gap-4">
						<Skeleton>
							<div className="h-6 w-44 rounded-full" />
						</Skeleton>

						<Skeleton>
							<div className="h-12 w-3/4" />
						</Skeleton>

						<Skeleton>
							<div className="h-9 w-32" />
						</Skeleton>

						<div className="mt-6">
							<Skeleton>
								<div className="h-5 w-24" />
							</Skeleton>

							<div className="mt-3 flex flex-col gap-2">
								<Skeleton>
									<div className="h-4 w-full" />
								</Skeleton>
								<Skeleton>
									<div className="h-4 w-11/12" />
								</Skeleton>
								<Skeleton>
									<div className="h-4 w-4/5" />
								</Skeleton>
							</div>

							<div className="mt-8">
								<Skeleton>
									<div className="h-4 w-56" />
								</Skeleton>
							</div>
						</div>

						<div className="mt-10 flex flex-col sm:flex-row gap-4">
							<Skeleton>
								<div className="h-[52px] w-full sm:flex-1" />
							</Skeleton>
							<Skeleton>
								<div className="h-[52px] w-full sm:w-40" />
							</Skeleton>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

