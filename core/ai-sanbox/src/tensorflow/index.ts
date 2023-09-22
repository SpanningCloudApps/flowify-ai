/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { TerratriceModel } from "./model/TerratriceModel";

const assemble = async () => {
  const instance = new TerratriceModel();

  await instance.assembleModel();
  await instance.trainModel();

  instance.displayModelSummary();

  await instance.serializeModel();
};

assemble();
