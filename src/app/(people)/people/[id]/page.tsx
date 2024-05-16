import { API_URL } from "@/app/constants";
import { formattedNetWorth } from "@/lib/format";
import styles from "@/styles/person-info.module.css";

interface PersonDetailInfo {
  squareImage: string;
  name: string;
  netWorth: number;
  country: string;
  industries: string[];
  bio: string[];
  financialAssets?: {
    ticker: string;
    numberOfShares: number;
    exerciseOptionPrice?: number;
  }[];
}

interface IParams {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: IParams) {
  const person = await getPersonInfo(id);

  return {
    title: person.name,
  };
}

async function getPersonInfo(id: string): Promise<PersonDetailInfo> {
  const response = await fetch(`${API_URL}/person/${id}`);
  return response.json();
}

export default async function PersonDetailPage({ params: { id } }: IParams) {
  const person = await getPersonInfo(id);

  return (
    <div className={styles.container}>
      <img
        src={person.squareImage}
        className={styles.poster}
        alt={person.name}
      />
      <div className={styles.info}>
        <h1 className={styles.title}>{person.name}</h1>
        <p>{`Networth: ${formattedNetWorth(person.netWorth)}`}</p>
        <p>{`Country: ${person.country}`}</p>
        <p>{`Industry: ${person.industries[0]}`}</p>
        <p>{person.bio.map((item) => item)}</p>
      </div>

      {person.financialAssets && (
        <>
          <h1 className={styles.financial_title}>Financial Assets</h1>
          <div className={styles.financial_container}>
            {person.financialAssets.map((item, index) => (
              <div className={styles.financial_item} key={index}>
                <p>{`Ticker: ${item.ticker}`}</p>
                <p>{`Shares: ${item.numberOfShares.toLocaleString(
                  "ko-KR"
                )}`}</p>
                {item.exerciseOptionPrice && (
                  <p>{`Excersie Price: $${item.exerciseOptionPrice}`}</p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
