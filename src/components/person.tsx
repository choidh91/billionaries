"use client";

import { useRouter } from "next/navigation";
import styles from "@/styles/person.module.css";
import Link from "next/link";
import { formattedNetWorth } from "@/lib/format";

export interface IPerson {
  id: string;
  name: string;
  thumbnail: string;
  squareImage: string;
  netWorth: number;
  industries: string[];
}

interface IPersonProps {
  person: IPerson;
}

export default function Person({ person }: IPersonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/people/${person.id}`);
  };

  return (
    <div className={styles.person}>
      <img src={person.squareImage} alt={person.name} onClick={handleClick} />
      <Link prefetch href={`/people/${person.id}`}>
        {person.name}
      </Link>
      <span>{`${formattedNetWorth(person.netWorth)} / ${
        person.industries[0]
      }`}</span>
    </div>
  );
}
