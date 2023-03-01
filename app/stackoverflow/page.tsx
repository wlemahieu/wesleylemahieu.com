import Image from 'next/image';
import Link from 'next/link';

const baseURL = process.env.MODE === 'development' ? 'http://127.0.0.1:5000' : 'https://wesleylemahieu.com';

const colors: { [key: string]: string } = {
  gold: 'rgb(254,195,10)',
  silver: 'rgb(165,170,174)',
  bronze: 'rgb(198,149,113)',
};

export default async function Stackoverflow() {
  let stats: any = {};

  try {
    const results = await fetch(`${baseURL}/api/getStackoverflowProfile`);
    if (results.ok) {
      const json = await results.json();
      stats = json.stats;
    }
  } catch (e) {
    console.log(e);
  }

  const badges = stats?.badges?.map((badge: any) => {
    const split = badge.description.split(' badge:');
    const type = split[0] as string;
    const description = split[1] as string;
    return { ...badge, type, description };
  });

  const goldBadges = badges?.filter((b: any) => b.type === 'gold')?.length;
  const silverBadges = badges?.filter((b: any) => b.type === 'silver')?.length;
  const bronzeBadges = badges?.filter((b: any) => b.type === 'bronze')?.length;

  return (
    <div className="container mx-auto text-center flex flex-col justify-center max-w-screen-sm">
      <h1 className="text-4xl font-bold text-base5">Stackoverflow Contributions</h1>
      <div className="container mx-auto max-w-screen-sm">
        <br />
        <div className={`gradient-box-1 mt-12 p-4`}>
          I'm the new kid on the block when it comes to answering questions on Stackoverflow, however, I've been helping
          people troubleshoot issues for 15+ years. I'm currently in the{' '}
          <span className="text-base5">{stats?.achievement}</span> on{' '}
          <Image
            src="/stackoverflow.svg"
            width="25"
            height="25"
            style={{ display: 'inline' }}
            alt="Stackoverflow logo"
            priority
          />{' '}
          Stackoverflow.com.
        </div>
        <div className="mt-8">
          Check out{' '}
          <Link
            href="https://stackoverflow.com/users/904956/wesley-lemahieu?tab=answers&sort=votes"
            target="_blank"
            className="text-base text-base1"
          >
            my answers
          </Link>{' '}
          to see how I&apos;ve contributed.
        </div>
      </div>
      <div className="container mx-auto text-center flex flex-row gap-4 justify-center max-w-screen-sm mt-8">
        <div>
          <div>
            Reputation: <span className="text-base4">{stats?.reputation}</span>
          </div>
          <div>
            People Reached: <span className="text-base4">{stats?.reached}</span>
          </div>
          <div>
            Total Answers: <span className="text-base4">{stats?.answers}</span>
          </div>
        </div>
        <div>
          <div>
            Gold Badges: <span style={{ color: colors.gold }}>{goldBadges}</span>
          </div>
          <div>
            Silver Badges: <span style={{ color: colors.silver }}>{silverBadges}</span>
          </div>
          <div>
            Bronze Badges: <span style={{ color: colors.bronze }}>{bronzeBadges}</span>
          </div>
        </div>
      </div>
      <div className="mt-8">
        {badges?.map((badge: any, key: number) => {
          return (
            <div
              key={`k-${key}`}
              style={{
                color: colors[badge.type],
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                rowGap: '.1rem',
                marginBottom: '2rem',
              }}
            >
              <h3>{badge.title}</h3>
              <div>{badge.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
