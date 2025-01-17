import { createEffect } from "solid-js";
import html from "solid-js/html";
import { render } from "solid-js/web";

import { useTimescape, useTimescapeRange } from "timescape/solid";

const App = () => {
  const { getInputProps, getRootProps, options } = useTimescape({
    date: new Date(),
    minDate: new Date("2022-01-01"),
    maxDate: new Date("2024-01-01"),
  });

  const {
    getRootProps: getRangeRootProps,
    from,
    to,
  } = useTimescapeRange({
    from: { date: new Date("2001") },
    to: { date: new Date() },
  });

  createEffect(() => {
    console.log("Date changed to", options.date);
  });

  return html` <div>
    Simple date time:
    <div class="timescape-root" ...${getRootProps()}>
      <input class="timescape-input" ...${getInputProps("years")} />
      <span class="separator">/</span>
      <input class="timescape-input" ...${getInputProps("months")} />
      <span class="separator">/</span>
      <input class="timescape-input" ...${getInputProps("days")} />
      <!-- non-breaking space -->
      <span class="separator">${"\xA0"}</span>
      <input class="timescape-input" ...${getInputProps("hours")} />
      <span class="separator">:</span>
      <input class="timescape-input" ...${getInputProps("minutes")} />
      <span class="separator">:</span>
      <input class="timescape-input" ...${getInputProps("seconds")} />
    </div>
    <br />
    Range:
    <div class="timescape-root" ...${getRangeRootProps()}>
      <input class="timescape-input" ...${from.getInputProps("years")} />
      <span class="separator">/</span>
      <input class="timescape-input" ...${from.getInputProps("months")} />
      <span class="separator">/</span>
      <input class="timescape-input" ...${from.getInputProps("days")} />
      <span class="separator">–</span>
      <input class="timescape-input" ...${to.getInputProps("years")} />
      <span class="separator">/</span>
      <input class="timescape-input" ...${to.getInputProps("months")} />
      <span class="separator">/</span>
      <input class="timescape-input" ...${to.getInputProps("days")} />
    </div>
  </div>`;
};

export const renderTo = (container: HTMLElement) => {
  const unmount = render(App, container);

  return unmount;
};
