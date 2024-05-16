import styles from "@/styles/home.module.css";
import { API_URL } from "@/app/constants";
import Person, { IPerson } from "@/components/person";

export const metadata = {
  title: "Home",
};

async function getBillionaries(): Promise<IPerson[]> {
  const response = await fetch(API_URL);
  const json = await response.json();
  return json;
}

export default async function Home() {
  const billionaries = await getBillionaries();

  return (
    <div className={styles.container}>
      {billionaries.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
}
