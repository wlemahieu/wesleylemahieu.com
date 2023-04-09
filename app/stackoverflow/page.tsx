import Image from 'next/image';
import Link from 'next/link';

const baseURL = process.env.MODE === 'development' ? 'http://localhost:3000' : 'https://wesleylemahieu.com';

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
    <>
      <div className="header">
        <h1>Stackoverflow</h1>
      </div>

      <div className="content">
        <h2 className="content-subhead">Recreational contributions</h2>
        <div>
          <div className="gradient-box-1" style={{ padding: '2rem', margin: '3rem 0rem 0rem 1rem' }}>
            <p>
              Sometimes in my spare time I help developers on Stackoverflow. I'm currently in the{' '}
              <b>{stats?.achievement}</b> on{' '}
              <Image
                src="/stackoverflow.svg"
                width="25"
                height="25"
                style={{ display: 'inline' }}
                alt="Stackoverflow logo"
                priority
              />{' '}
              Stackoverflow.com with fairly minimal effort.
            </p>
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <p>
                View some of{' '}
                <Link
                  href="https://stackoverflow.com/users/904956/wesley-lemahieu?tab=answers&sort=votes"
                  target="_blank"
                  className="text-base text-base1"
                >
                  my answers
                </Link>{' '}
                to see how I&apos;ve contributed.
              </p>
            </div>
          </div>
        </div>
        <div
          style={{ padding: '1rem', display: 'flex', columnGap: '4rem', justifyContent: 'center', marginTop: '2rem' }}
        >
          <div>
            <div>
              Reputation: <span>{stats?.reputation}</span>
            </div>
            <div>
              People Reached: <span>{stats?.reached}</span>
            </div>
            <div>
              Total Answers: <span>{stats?.answers}</span>
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
        <div style={{ maxWidth: '300px', margin: 'auto' }}>
          <div style={{ maxWidth: '300px', marginTop: '3rem', textAlign: 'center' }}>
            {badges?.map((badge: any, key: number) => {
              return (
                <div key={`k-${key}`} style={{ color: colors[badge.type], margin: '1rem' }}>
                  <h3>{badge.title}</h3>
                  <div style={{ borderBottom: '1px solid lightgrey', padding: '1rem' }}>{badge.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
