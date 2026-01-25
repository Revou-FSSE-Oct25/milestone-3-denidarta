import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "placehold.co",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "api.escuelajs.co", // Also allow images from the API if they are directly hosted there
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "picsum.photos", // Common placeholder, just in case
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "imgur.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "i.imgur.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
