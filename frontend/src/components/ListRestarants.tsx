import Restaurant from "./Restaurant";

const restarants = [
  "Restaracja1",
  "Restaracja2",
  "Restaracja3",
  "Restaracja4",
  "Restaracja5",
];

function ListRestarants() {
  // const listRestarants = restarants.map((restarant) => <li>{restarant}</li>);
  return (
    <>
      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-1 gap-10 h-auto">
          <Restaurant
            name="U Gruzina"
            description="'U Gruzina' powstała w 2014 roku we Wrocławiu. Współpracując z
              gruzińskimi i polskimi szefami kuchni, połączyli gruzińskie smaki
              z lokalną kulturą, aby sprostać lokalnym preferencjom i wyzwaniom."
            img="https://lh3.googleusercontent.com/p/AF1QipOAl-O6Qm932acmMkjr-qDfCRX1y6mMbot0UzBs=s680-w680-h510-rw"
            raiting={4}
            address="Plac Grunwaldzki 59, Wrocław"
            linkToMap="https://maps.app.goo.gl/7NQrNWJzETFWhP717"
            visited={true}
          />
          <Restaurant
            name="Restauracja Bella Storia"
            description="Prosta restauracja z ceglanymi ścianami oferująca włoskie klasyki, w tym makaron, pizzę i dania mięsne, oraz piwo."
            img="https://lh5.googleusercontent.com/p/AF1QipO6GRUn2vxTLSCxMJNaHOZd1GP24ZazMi_MW5nQ=w500-h500-k-no"
            raiting={4.5}
            address="plac Grunwaldzki 53, Wrocław"
            linkToMap="https://maps.app.goo.gl/1gT9UHEG53HinH2f6"
            visited={true}
          />
          <Restaurant
            name="WOO THAI"
            description="W Woo Thai odkrywamy przez Tobą Tajlandię. Tę prawdziwą, autentyczną. Tajlandię pełną zniewalających aromatów i wyjątkowych połączeń. Ciesz się smakiem wydobywanym z najlepszych składników przez naszych tajskich szefów kuchni według tradycyjnych receptur. Tajska kultura, sztuka i tradycje łączą się w naszej kuchni i na talerzach, by zmienić Twój dzień w zamorską przygodę."
            img="https://woothai.pl/wp-content/uploads/2024/03/bg_szama-3-2048x1152.png"
            raiting={4.5}
            address="Grunwaldzka 67, Wrocław"
            linkToMap="https://maps.app.goo.gl/1gT9UHEG53HinH2f6"
            visited={false}
          />
          <Restaurant
            name="Restauracja Piwnica Świdnicka"
            description="Piwnica Świdnicka to istniejąca od 1273 roku najstarsza restauracja w Europie, która opowiada o swojej historii jednocześnie będąc otwarta na nowe doświadczenia. Nasza filozofia dawania z siebie wszystkiego, co najlepsze jest oparta na wyrafinowanych smakach, świeżo warzonym na miejscu piwie, regionalnych produktach, tradycyjnej kuchni w nowoczesnym wydaniu oraz potrawach historycznych podawanych niegdyś w Piwnicy."
            img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyvM920LUoNef1qM7q9D8nK2Pp_00WRdJbjr0p7Rp87A&s"
            raiting={5}
            address="Rynek Ratusz 1A, Wrocław"
            linkToMap="https://maps.app.goo.gl/HjSHjmqGaD3PQJGL6"
            visited={false}
          />
        </div>
      </div>
    </>
  );
}

export default ListRestarants;
