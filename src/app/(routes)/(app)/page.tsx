import {
  EyeIcon,
  ListUnorderedIcon,
  PinIcon,
  RepoForkedIcon,
  StarIcon,
  TriangleDownIcon,
} from "@primer/octicons-react";
import { getSession } from "~/app/(actions)/auth";
import { getGithubRepoStats } from "~/app/(actions)/github";
import { Avatar } from "~/app/(components)/avatar";
import { Badge } from "~/app/(components)/badge";
import { CounterBadge } from "~/app/(components)/counter-badge";
import { LinkButton } from "~/app/(components)/linkbutton";
import { AUTHOR_AVATAR_URL, AUTHOR_USERNAME } from "~/lib/constants";
import { clsx } from "~/lib/functions";

export default async function Page() {
  const { user } = await getSession();
  // TODO :
  // - check if user as already starred the repo
  // - Also see if it is possible to call github api to manually watch/unwatch & star/unstar
  // docs : https://docs.github.com/fr/graphql/overview/explorer
  // const repositoryStats = await getGithubRepoStats();

  return (
    <div className="flex flex-col gap-4">
      <section
        id="repository-header"
        className="pb-6 border-b border-neutral flex items-center justify-between"
      >
        <h1 className="text-2xl font-semibold flex items-center gap-3">
          <Avatar
            username={AUTHOR_USERNAME}
            src={AUTHOR_AVATAR_URL}
            size="small"
          />
          <span>gh-next</span>

          <Badge label="Public" />
        </h1>

        <div className="flex items-center gap-3">
          <LinkButton
            href="https://github.com/Fredkiss3/gh-next"
            variant="ghost"
            className="!px-4"
            isSquared
            renderLeadingIcon={(cls) => (
              <PinIcon className={clsx(cls, "text-grey -scale-x-100")} />
            )}
          >
            Pin
          </LinkButton>
          <LinkButton
            href="https://github.com/Fredkiss3/gh-next"
            variant="ghost"
            className="!px-4"
            isSquared
            renderLeadingIcon={(cls) => (
              <EyeIcon className={clsx(cls, "text-grey")} />
            )}
            renderTrailingIcon={(cls) => (
              <TriangleDownIcon className={clsx(cls, "text-grey")} />
            )}
          >
            Watch
            <CounterBadge count={1} />
          </LinkButton>
          <LinkButton
            href="https://github.com/Fredkiss3/gh-next"
            variant="ghost"
            className="!px-4"
            isSquared
            renderLeadingIcon={(cls) => (
              <RepoForkedIcon className={clsx(cls, "text-grey")} />
            )}
            renderTrailingIcon={(cls) => (
              <TriangleDownIcon className={clsx(cls, "text-grey")} />
            )}
          >
            Fork
            <CounterBadge count={1} />
          </LinkButton>
          <LinkButton
            href="https://github.com/Fredkiss3/gh-next"
            variant="ghost"
            className="!px-4"
            isSquared
            renderLeadingIcon={(cls) => (
              <StarIcon className={clsx(cls, "text-grey")} />
            )}
            renderTrailingIcon={(cls) => (
              <TriangleDownIcon className={clsx(cls, "text-grey")} />
            )}
          >
            <span>Star</span>
            <CounterBadge count={12} />
          </LinkButton>
        </div>
      </section>

      <ReadmeContent />
    </div>
  );
}

function ReadmeContent() {
  return (
    <div className="rounded-md border border-neutral">
      <div className="border-b border-neutral flex items-center gap-2 p-4">
        <button className="flex items-center justify-center p-2 rounded-md hover:bg-neutral/50">
          <ListUnorderedIcon className="h-4 w-4 text-grey" />
        </button>
        <h2 className="font-semibold text-base">README.md</h2>
      </div>
      <article className="p-4">
        <h3 className="text-2xl font-bold">Let me cook...</h3>
        <p className="my-6 text-lg">
          The labels on the buttons aboves (watch, fork, star) are refetched
          every 30 mins, why not give a star&nbsp;
          <a
            href="https://github.com/Fredkiss3/gh-next"
            className="text-accent"
          >
            to the original repo ?
          </a>
        </p>
      </article>
    </div>
  );
}
