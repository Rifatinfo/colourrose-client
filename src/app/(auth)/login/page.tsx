import CinematicBackground from "@/components/modules/AuthLogin/CinematicBackground";
import GlassmorphicAuthCard from "@/components/modules/AuthLogin/GlassmorphicAuthCard";

const AuthPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) => {
  const params = (await searchParams) || {};
  console.log("params : ", params);
  console.log(params.redirect);
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#fafafa] py-8">
      {/* 3D Background Layer */}
      <CinematicBackground />

      {/* Main Content */}
      <div className="relative z-20 w-full px-4">
        <GlassmorphicAuthCard redirect={params.redirect} />
      </div>
    </div>
  );
};

export default AuthPage;
