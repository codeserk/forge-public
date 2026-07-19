# forge-agent

Pull-side agent for Forge Observability. Runs inside a customer Kubernetes cluster and tunnels Prometheus and Loki queries from Forge over NATS.

## Quickstart

```bash
helm install forge-agent oci://ghcr.io/codeserk/charts/forge-agent \
  --set tenantID=<your-forge-tenant-id> \
  --set nats.url=nats://nats.forge.codeserk.es:4222 \
  --set integrations.prom.enabled=true \
  --set integrations.prom.url=http://prometheus.monitoring.svc.cluster.local:9090 \
  --set integrations.loki.enabled=true \
  --set integrations.loki.url=http://loki.monitoring.svc.cluster.local:3100
```

`tenantID` is mandatory. To avoid passing it via `--set`, create a Secret with key `FORGE_TENANT_ID` and reference it with `--set existingSecretName=<name>`.

See `values.yaml` for the full set of knobs.
