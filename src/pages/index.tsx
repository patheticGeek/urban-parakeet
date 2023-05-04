import { type NextPage } from "next";
import { api } from "~/utils/api/client";

const Home: NextPage = () => {
  const { data, isLoading } = api.auth.me.useQuery();

  return (
    <div className="m-auto">
      <div className="rounded-lg bg-slate-200 px-6 py-4 shadow-md">
        {isLoading ? (
          "Loading..."
        ) : !data ? (
          "Not signed in"
        ) : (
          <>
            <h2 className="text-semibold text-2xl">{data.name}</h2>
            <div className="text-gray-700">
              {data.email} ({data.verified ? "verified" : "unverified"})
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
