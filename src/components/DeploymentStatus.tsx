import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle, Loader2, ExternalLink, RefreshCw } from 'lucide-react';

interface DeploymentStatus {
  status: 'deploying' | 'live' | 'error' | 'unknown';
  url?: string;
  message?: string;
  lastChecked?: string;
}

export function DeploymentStatus() {
  const [deployment, setDeployment] = useState<DeploymentStatus>({ status: 'unknown' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDeploymentStatus = async () => {
    setLoading(true);
    setError(null);

    try {
      // Try to fetch from local file first (if available)
      const response = await fetch('/api/deployment-status');
      
      if (response.ok) {
        const data = await response.json();
        setDeployment({
          status: data.status || 'unknown',
          url: data.url,
          message: data.message,
          lastChecked: new Date().toISOString(),
        });
      } else {
        // Fallback: check for .nexlayer-url file or environment variable
        const url = import.meta.env.VITE_NEXLAYER_URL || localStorage.getItem('nexlayer-url');
        
        if (url) {
          setDeployment({
            status: 'live',
            url: url,
            lastChecked: new Date().toISOString(),
          });
        } else {
          setDeployment({
            status: 'unknown',
            message: 'Deployment URL not found. Please check your deployment configuration.',
          });
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch deployment status');
      setDeployment({
        status: 'error',
        message: 'Unable to fetch deployment status',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeploymentStatus();
  }, []);

  const getStatusIcon = () => {
    switch (deployment.status) {
      case 'live':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'deploying':
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Loader2 className="h-5 w-5 text-gray-500 animate-spin" />;
    }
  };

  const getStatusBadge = () => {
    switch (deployment.status) {
      case 'live':
        return <Badge className="bg-green-500">Live</Badge>;
      case 'deploying':
        return <Badge className="bg-blue-500">Deploying</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <CardTitle>Deployment Status</CardTitle>
          </div>
          {getStatusBadge()}
        </div>
        <CardDescription>
          Monitor your Nexlayer deployment status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {deployment.url && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Deployment URL:</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-3 py-2 bg-muted rounded-md text-sm break-all">
                {deployment.url}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(deployment.url, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open
              </Button>
            </div>
          </div>
        )}

        {deployment.message && (
          <p className="text-sm text-muted-foreground">{deployment.message}</p>
        )}

        {deployment.lastChecked && (
          <p className="text-xs text-muted-foreground">
            Last checked: {new Date(deployment.lastChecked).toLocaleString()}
          </p>
        )}

        <Button
          onClick={fetchDeploymentStatus}
          disabled={loading}
          variant="outline"
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Checking...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Status
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

