import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <p>
      check out{" "}
      <Link href="/foo">
        <a>/foo</a>
      </Link>
    </p>
  );
};

export default Home;
